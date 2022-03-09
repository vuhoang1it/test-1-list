export class SearchDTO {
  title: string;
  value: number;
  time: number;
  constructor(title: string, value: number, time: number) {
    this.title = title;
    this.value = value;
    this.time = time;
  }
}