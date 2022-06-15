import { IsNotEmpty } from 'class-validator';

export class GetArticleBySlugParam {
  @IsNotEmpty()
  readonly slug: string;
}
