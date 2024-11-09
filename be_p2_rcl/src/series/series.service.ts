/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSeriesDto } from './dto/create-series.dto';
import { UpdateSeriesDto } from './dto/update-series.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Series } from './entities/series.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SeriesService {
  constructor(
    @InjectRepository(Series)
    private seriesRepository: Repository<Series>,
  ) {}

  async create(createSeriesDto: CreateSeriesDto): Promise<Series> {
    //CREAR
    const existeSeries = await this.seriesRepository.findOneBy({
      titulo: createSeriesDto.titulo,
    });
    //Para no crear 2 veces  los mismo
    if (existeSeries) {
      throw new ConflictException('la serie ya existe');
    }

    return this.seriesRepository.save({
      titulo: createSeriesDto.titulo.trim(),
      sinopsis: createSeriesDto.sinopsis.trim(),
      director: createSeriesDto.director.trim(),
      temporada: createSeriesDto.temporada,
      fechaEstreno: createSeriesDto.fechaEstreno,
    });
  }
  // LEER
  async findAll(): Promise<Series[]> {
    return this.seriesRepository.find();
  }
  //para obtener una serie un buscador  por un id
  async findOne(id: number): Promise<Series> {
    const series = await this.seriesRepository.findOneBy({ id });
    if (!series) {
      throw new NotFoundException('No existe la serie ${id}');
    }
    return series;
  }
  //ACTUALIZAR
  async update(id: number, updateSeriesDto: UpdateSeriesDto): Promise<Series> {
    const series = await this.seriesRepository.findOneBy({ id });
    const seriesUpdate = Object.assign(series, updateSeriesDto);
    return this.seriesRepository.save(seriesUpdate);
  }
  //ELIMINAR
  async remove(id: number) {
    const series = await this.seriesRepository.findOneBy({ id });
    return this.seriesRepository.delete(id);
  }
}
