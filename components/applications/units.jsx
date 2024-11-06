import { Label } from "../ui/label"
import ComboBox from "./comboBox"
import { useState } from "react"
import { useGetAllUnitsQuery, useCreateUnitMutation } from "@/store/services/units"
import { UnitsSkeleton } from "../skeletons"

export default function Units() {
    const [selectedUnits, setSelectedUnits] = useState()

    const [createUnit] = useCreateUnitMutation()

    const handleCreateUnits = (value) => {
        createUnit({ title: value.toUpperCase() })
    }

    const { data: units, isLoading, error } = useGetAllUnitsQuery()
    if (isLoading) return <UnitsSkeleton />
    if (error) return <div>{error.message}</div>
    const unitsList = units?.map(unit => { return { value: unit.id, label: unit.title } })
    return (
        <>
            <Label htmlFor="units" className="text-sm">Одиниці виміру</Label>
            <ComboBox
                id="units"
                options={unitsList}
                value={selectedUnits}
                onSelectedOption={setSelectedUnits}
                onCreateOption={(value) => handleCreateUnits(value)}
                isMulti={false}
                placeholder={"..."}
            />
        </>
    )
}