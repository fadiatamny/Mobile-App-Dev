export const catImage = () => {
    const index: number = Math.floor(Math.random() * 11) + 1;

    switch(index){
        case 1:
            return require('../../../assets/cats/1.jpg');
        case 2:
            return require('../../../assets/cats/2.jpg');
        case 3:
            return require('../../../assets/cats/3.jpg');
        case 4:
            return require('../../../assets/cats/4.jpg');
        case 5:
            return require('../../../assets/cats/5.jpg');
        case 6:
            return require('../../../assets/cats/6.jpg');
        case 7:
            return require('../../../assets/cats/7.jpg');
        case 8:
            return require('../../../assets/cats/8.jpg');
        case 9:
            return require('../../../assets/cats/9.jpg');
        case 10:
            return require('../../../assets/cats/10.jpg');
        case 11:
            return require('../../../assets/cats/11.jpg');
    }
};