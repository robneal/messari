export const getFormattedDateString = (event: Date | undefined ): string =>{
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    if(!event) return '';
    return new Date(event).toLocaleDateString('en-US', options);
} 

export default getFormattedDateString; 