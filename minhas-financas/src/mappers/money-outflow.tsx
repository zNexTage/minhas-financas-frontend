import MoneyOutflow from "../entities/MoneyOutflow";

class MoneyOutflowMapper {
    fromDto(dto: MoneyOutflowDto): MoneyOutflow {
        const [year, month, day] = dto.date.split("-");

        return new MoneyOutflow(
            dto.description,
            dto.value,
            dto.quantity,
            dto.paymentMethod,
            dto.paymentLocation,
            dto.paymentCategory,
            new Date(
                parseInt(year), 
                parseInt(month) - 1, 
                parseInt(day)
                ),
            dto.id
        );
    }
}

export default MoneyOutflowMapper;