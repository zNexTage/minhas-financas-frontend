import MoneyInflowDto from "../dto/MoneyInflowDto";
import MoneyInflow from "../entities/MoneyInflow";

class MoneyInflowMapper {
    fromDto(dto: MoneyInflowDto): MoneyInflow {
        const [year, month, day] = dto.date.split("-");

        return new MoneyInflow(
            dto.description,
            dto.value,
            new Date(
                parseInt(year), 
                parseInt(month) - 1, 
                parseInt(day)
                ),
            dto.id
        );
    }
}

export default MoneyInflowMapper;