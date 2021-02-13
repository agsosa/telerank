export function truncateWithEllipses(str, max, add) 
{
    add = add || '...';
    return (typeof str === 'string' && str.length > max ? str.substring(0,max)+add : str);
} 

export function translateRouteName(routeName) {
    switch(routeName){
        case "Home": return "Home";
        default: return routeName;
    }
}