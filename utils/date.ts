export const getFormattedDate = (date: any) =>  {
    // return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    /*
    slice(start,exceptEndIndex) takes that arrays indexes between start and end to display as an another array
    in this example to make it (YYYY-MM-DD) as a 10 digit
    */
    return date.toISOString().slice(0, 10);
    
}

export const getDateMinusDays = (date: any, days: any) =>  {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}