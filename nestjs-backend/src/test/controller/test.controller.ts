import { Controller, Put, Body, Param, Post, Get, UseGuards } from '@nestjs/common';
import { TestService } from '../service/test.service';
import { TestDto } from './dto/test.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthenticationGuard } from 'src/authentication/guards/authentication.guard';


@ApiTags('test')
@Controller('test')
export class TestController {
    constructor(private testService: TestService) {
        this.testService =  this.testService;
    }

    @ApiBearerAuth() /* This swagger decorator is used to indicate that the endpoint requires authentication */
    @UseGuards(AuthenticationGuard)
    @Get()
    async findAll(): Promise<TestDto[]> {
        let models = await this.testService.findAll();
        return models.map(m => TestDto.toDto(m));
    }

    @Post()
    async add(@Body() testDto: TestDto): Promise<TestDto> {
        let req = testDto.toModel();
        let model = await this.testService.add(req);
        return TestDto.toDto(model);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() testDto: TestDto): Promise<TestDto> {
        let model = await this.testService.update(id, testDto.toModel());
        return TestDto.toDto(model);
    }
}
