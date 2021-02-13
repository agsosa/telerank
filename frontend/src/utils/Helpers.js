export function truncateWithEllipses(str, max, add) 
{
    add = add || '...';
    return (typeof str === 'string' && str.length > max ? str.substring(0,max)+add : str);
} 