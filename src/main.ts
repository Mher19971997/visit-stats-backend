import { AppModule } from '@visit_stats_backend/src/app.module';
import { startApp } from '@visit_stats_backend/service/src/index';

(async function bootstrap() {
  process.env['app.name'] = 'app-api';
  await startApp(AppModule, 'app-api');
})();
