class MoneyInflow {
    
    constructor(
        public description:string,
        public value:number,
        public date:Date,
        public id?:number
    ) {
        
    }

    public getFormatedValue():string {
        const numberFormat = new Intl.NumberFormat("pt-BR", { style: 'currency', currency: 'BRL' });

        return numberFormat.format(this.value);
    }
}

export default MoneyInflow;