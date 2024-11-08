import { Label } from "../ui/label"
import ComboBox from "./comboBox"
import { useState } from "react"
import { useGetAllUnitsQuery, useCreateUnitMutation } from "@/store/services/units"
import { InputSkeleton } from "../skeletons"
import { ServerError } from "../alerts"
import { useDispatch } from "react-redux"
import { setUnitId } from "@/store/reducers/currentOrderSlice"
import toast from 'react-hot-toast';

export default function Units() {
    const [selectedUnits, setSelectedUnits] = useState()
    const dispatch = useDispatch()

    const [createUnit] = useCreateUnitMutation()

    const handleCreateUnits = (value) => {
        createUnit({ title: value.toUpperCase() })
        toast.success('Одиницю виміру успішно додано')
    }

    const handleSelectUnits = (value) => {
        dispatch(setUnitId(value.value))
        setSelectedUnits(value)
    }

    const { data: units, isLoading, error } = useGetAllUnitsQuery()
    if (isLoading) return <InputSkeleton />
    if (error) return <ServerError error={error} />
    const unitsList = units?.map(unit => { return { value: unit.id, label: unit.title } })
    return (
        <ComboBox
            id="units"
            options={unitsList}
            value={selectedUnits}
            onSelectedOption={(e) => handleSelectUnits(e)}
            onCreateOption={(value) => handleCreateUnits(value)}
            isMulti={false}
            placeholder={"..."}
        />
    )
}