const setExpirationDate = (seconds) => {
    const now = new Date(Date.now());
    now.setSeconds(now.getSeconds() + seconds);
    return now;
};

export default setExpirationDate;
