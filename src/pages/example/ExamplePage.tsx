
import { useEffect, useRef, useState } from "react"
import YandexMap from "../../components/yamap/YandexMap"
import { CoordsField } from "../../ui"


export const ExamplePage = () => {

    const [coords, setCoords] = useState<[number,number]>([55.7887400, 49.1221400])
    const onCoordsChange = (coords:[number,number]) => {
        setCoords(coords)
    }

    return (
        <div>
            <CoordsField label="Выберите координаты" onChange={onCoordsChange} coords={coords} />
        </div>
    );
}

export default ExamplePage