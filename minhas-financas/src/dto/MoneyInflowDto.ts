class MoneyInflowDto {   

    private constructor(
        public description: string,
        public value: number,
        public date: string,
        public id?: number
    ) {
        
    }       
}

export default MoneyInflowDto;