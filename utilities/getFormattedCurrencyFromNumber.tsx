export const getFormattedCurrencyFromNumber = (num: number | undefined ) =>{
    
    // Ref: https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      
        // These options are needed to round to whole numbers if that's what you want.
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    if(!num) formatter.format(0); 
    return formatter.format(num as number); /* $num.00 */
} 

export default getFormattedCurrencyFromNumber; 