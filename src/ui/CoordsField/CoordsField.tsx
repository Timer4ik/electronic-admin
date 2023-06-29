
import { FC, ReactNode, useEffect, useRef, useState } from "react"
import { Stack } from "../Stack/Stack"
import Field from "../Field/Field"

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
    coords?: [number, number]
    onChange?: (newCoords: [number, number]) => void
    label?: string
}

export const CoordsField: FC<Props> = ({ coords, label, onChange, ...props }) => {

    const mapRef = useRef<MyMapType>(null)
    const mainMark = useRef<PlacemarkType>()

    const setPlacemark = (coords: [number, number]) => {
        mainMark.current?.geometry.setCoordinates(coords)
    }

    useEffect(() => {
        if (!coords) return
        setPlacemark(coords)
    }, [coords])

    useEffect(() => {
        ymaps.ready(() => {

            mapRef.current = new ymaps.Map("map", {
                center: coords || [0, 0],
                zoom: 12,
                controls: []
            })

            mapRef.current?.events.add('click', function (e: any) {
                let coords: [number, number] = e.get('coords');
                if (!onChange) return
                onChange(coords)
            });

            if (!coords) return
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
        <Stack gap={3} flexDirection="column">
            {label ? <div className='field__label'>{label}</div> : null}
            <Stack gap={5}>
                <Field type="number" onChange={(e) => onChange && onChange([+e?.target?.value, (coords?.[1] ?? 0)])} label={"Широта"} value={`${coords?.[0]}`} />
                <Field type="number" onChange={(e) => onChange && onChange([(coords?.[0] ?? 0), +e?.target?.value])} label={"Долгота"} value={`${coords?.[1]}`} />
            </Stack>
            <div id="map" style={{ width: "100%", height: "600px", borderRadius: "20px" }}></div>
        </Stack>
    );
}
