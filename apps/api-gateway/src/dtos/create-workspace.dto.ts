import { IsNotEmpty } from 'class-validator';

export class CreateWorkspaceDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
