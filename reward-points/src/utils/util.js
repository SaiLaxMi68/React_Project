export const rewardsPoints =(amount)=> {
    let points=0;
    if(amount>100) {
        points +=2*(amount-100);
        points +=50;
    } else if(amount>50) {
        points +=amount-50
    }
    return Math.floor(points);
};