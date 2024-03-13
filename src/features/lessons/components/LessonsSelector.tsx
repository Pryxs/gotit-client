import { useEffect, useState } from "react";
import { Select } from "components";
import { getLessons } from "../api";
import { useAuth } from "hooks";

type SelectorProps = {
    selectedLessons: string[];
    setSelectLessons: (lessons: string[]) => void 
}

export const LessonsSelector:React.FC<SelectorProps> = ({selectedLessons, setSelectLessons}) => {
    const { id } = useAuth();
    const [lessons, setLessons] = useState<({ id: string; name: string})[]>([])

    const fetchData = async () => {
        const lessons = await getLessons({ author: id})
        setLessons(lessons.map(lesson => ({id: lesson._id, name: lesson.title})))
    }

    useEffect(() => {
        fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedLessons])

    return(
        <Select 
            options={lessons} 
            selected={selectedLessons} 
            setSelected={setSelectLessons} 
            placeholder='Sélectionner une catégorie'
        />
    )
}