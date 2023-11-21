export const getFormattedDate = (date: any) =>  {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

export const getDateMinusDays = (date: any, days: any) =>  {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}