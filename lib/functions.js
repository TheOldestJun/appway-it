export const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 6) {
        return "Доброї ночі";
    } else if (hour < 12) {
        return "Доброго ранку";
    } else if (hour < 18) {
        return "Доброго дня";
    } else {    
        return "Доброго вечора";
    }
}