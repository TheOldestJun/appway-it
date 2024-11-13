import ComboBox from "./comboBox"
import { useState, useEffect } from "react"
import { useGetAllUnitsQuery, useCreateUnitMutation } from "@/store/services/units"
import { InputSkeleton } from "../skeletons"
import { ServerError } from "../alerts"
import { useDispatch, useSelector } from "react-redux"
import { setUnit } from "@/store/reducers/currentOrderSlice"
import toast from 'react-hot-toast';

export default function Units() {
    const unit = useSelector(state => state.currentOrder.unit)
    useEffect(() => {
        setSelectedUnits(unit)
    }, [unit])
    const [selectedUnits, setSelectedUnits] = useState()
    const dispatch = useDispatch()

    const [createUnit] = useCreateUnitMutation()

    const handleCreateUnits = async (value) => {
        try {
            const payload = await createUnit({ title: value })
            if (payload) toast.success('Одиницю виміру успішно додано')
        } catch (error) {
            toast.error(error)
        }

    }

    const handleSelectUnits = (value) => {
        dispatch(setUnit(value))
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