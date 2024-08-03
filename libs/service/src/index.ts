import 'source-map-support/register';
import '@visit_stats_backend/shared/src/util/global';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger } from '@visit_stats_backend/shared/src/util/logger';
import { ConfigService } from '@visit_stats_backend/shared/src/config/config.service';
import { ValidationPipe } from '@visit_stats_backend/shared/src/pipes/validation.pipe';
import { UrlParserInspector } from '@visit_stats_backend/shared/src/inspector/url-parser.inspector';
import { EmptyResponseInspector } from '@visit_stats_backend/shared/src/inspector/empty-response.inspector';
import { AllExceptionsFilter } from '@visit_stats_backend/shared/src/filters/all-exceptions.filter';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import basicAuth from 'express-basic-auth'
import { INestApplication } from '@nestjs/common';

export const server = async (app: NestExpressApplication, mod: any, confPref: string) => {
    const configs = app.get(ConfigService);
    global.Configs = configs;
    const logger = new Logger(mod.name);
    const appConf = configs.get<any>(confPref);
    
    app.useLogger([configs.get<any>('app.logging')]);
    app.useGlobalPipes(new ValidationPipe(logger));
    // app.useGlobalInterceptors(new RequestLimitInspector());
    app.useGlobalInterceptors(new UrlParserInspector());
    app.useGlobalInterceptors(new EmptyResponseInspector());
    app.useGlobalFilters(new AllExceptionsFilter());
    app.setGlobalPrefix(`${appConf.endpoint}/${appConf.version}`);
    app.enableCors({ origin: '*' });
    app.useStaticAssets('static');
    await swagger(app, mod, confPref);

    await app.listen(Number(appConf.http.port), appConf.http.host);
    logger.log(`Application is running on: ${await app.getUrl()}`);
  };
  

export const swagger = async (app: INestApplication, mod: any, confPref: string) => {
  const configs = app.get(ConfigService);
  const logger = new Logger(mod.name);
  const appConf = configs.get<any>(confPref);
  // Ensure proper string concatenation or template literals for paths
  app.use(
    [`${appConf.endpoint}/doc`, `${appConf.endpoint}/doc-json`],
    basicAuth({
      challenge: true,
      users: { [appConf.swagger.user]: appConf.swagger.pass },
    }),
  );

  // Using template literals for logging
  logger.log(`${appConf.endpoint}/doc , ${appConf.endpoint}/doc-json`);

  const servers = configs.get<string[]>(`${confPref}.swagger.servers`);
  const options = new DocumentBuilder()
    .setTitle(confPref)
    .setVersion('1.0')

  servers.forEach((value) => {
    options.addServer(value);
  });

  const document = SwaggerModule.createDocument(app, options.build(), { deepScanRoutes: true });
  
  await SwaggerModule.setup(`${appConf.endpoint}/doc`, app, document, {
    explorer: true,
    customSiteTitle: 'Visit Stats API',
  });
};


export const startApp = async (mod: any, confPref: string) => {
  const logger = new Logger(mod.name);
  const app = await NestFactory.create<NestExpressApplication>(mod, { logger });

  await server(app, mod, confPref);
};
  