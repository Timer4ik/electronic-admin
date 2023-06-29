
import { FC, ReactNode, useEffect, useRef, useState } from "react"

type MyMapType = {
    destroy: () => void
    getCenter: () => [number, number]
    geoObjects: {
        add: (placemark: PlacemarkType) => void
    }
    balloon: any
    events: {
        add: any
    }
} | null

type MapType = new (id: string, options: {
    center: [number, number],
    zoom: number
    controls: any[]
}) => MyMapType

interface PlacemarkType {
    geometry: {
        setCoordinates: any
    }
}

type newPlacemarkType = new (coords: any[], options1: {
    hintContent?: string
    balloonContent?: string
}, options2: {
    iconLayout?: string
    iconImageHref?: string
    iconImageSize?: [number, number]
    iconImageOffset?: [number, number]
}) => PlacemarkType

interface ymapsType {
    Map: MapType
    Placemark: newPlacemarkType
    ready: (callback: any) => void
}

declare let ymaps: ymapsType;

interface Props {
    children?: ReactNode
    instance?: MyMapType | undefined
    setInstance?: (inst: MyMapType) => void
    coords: [number, number]
}

const YandexMap: FC<Props> = ({ coords }) => {

    const mapRef = useRef<MyMapType>(null)
    const mainMark = useRef<PlacemarkType>()

    const setPlacemark = (coords: [number, number]) => {
        mainMark.current?.geometry.setCoordinates(coords)
    }

    useEffect(() => {
        // Почему то без обёртки setTimeout возникает ошибка
        ymaps.ready(() => {

            mapRef.current = new ymaps.Map("map", {
                center: coords, // Москва
                zoom: 12,
                controls: []
            })

            mapRef.current?.events.add('click', function (e: any) {
                var coords = e.get('coords');
                setPlacemark(coords)
            });

            mainMark.current = new ymaps.Placemark(coords, {
            }, {
                iconLayout: 'default#image',
                iconImageHref: '/img/icons/placemark.svg',
                iconImageSize: [50, 50],
                iconImageOffset: [-25, -25]
            })
            
            mapRef.current?.geoObjects.add(mainMark.current)
        })

        return () => {
            mapRef.current?.destroy()
        }
    }, [])



    return (
        <div id="map" style={{ width: "600px", height: "600px" }}></div>
    );
}

export default YandexMap