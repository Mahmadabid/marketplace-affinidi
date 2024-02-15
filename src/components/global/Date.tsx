const GetDate = () => {

    const currentDate = new Date();
    const dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][currentDate.getUTCDay()];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = monthNames[currentDate.getUTCMonth()];
    const day = currentDate.getUTCDate();
    const year = currentDate.getUTCFullYear();
    const hours = currentDate.getUTCHours();
    const minutes = currentDate.getUTCMinutes();
    const seconds = currentDate.getUTCSeconds();

    const formattedDate = `${hours}:${minutes}.${seconds} ${dayOfWeek} ${month} ${day} ${year}`;

    return formattedDate;
}

export default GetDate