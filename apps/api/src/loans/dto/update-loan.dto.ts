import { PartialType } from '@nestjs/swagger';
import CreateLoanDto from './create-loan.dto';

export default class UpdateLoanDto extends PartialType(CreateLoanDto) {}
