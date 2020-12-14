import { Controller, Get, Inject, Req, Res, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Request, Response } from 'express';
import { of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

const logger = new Logger('Default Controller');

@Controller()
export class AppController {
  constructor(@Inject('OAuthService') private oauthClient: ClientProxy) {}

  @Get('/_ah_warmup')
  getData() {
    return;
    // return this.appService.getData();
  }

  @Get('')
  serverStatus() {
    return 'Server is online.';
  }

  @Get('intuit/oauth/authorize')
  authorize(@Req() req: Request, @Res() res: Response) {
    logger.log('/authorize request recieved');
    this.oauthClient
      .send<{ status: boolean; uri: string }>('authorize', {})
      .subscribe((response) => {
        if (response.status) {
          res.redirect(response.uri);
        } else {
          res.redirect('https://google.com');
        }
      });
  }

  @Get('intuit/oauth/redirect')
  oauthRedirect(@Req() req: Request, @Res() res: Response) {
    this.oauthClient
      .send<{ status: boolean }>('oauthRedirect', req.url)
      .subscribe((response) => {
        if (response.status) {
          res.status(302).redirect('https://reddit.com');
        } else {
          res.status(302).redirect('https://www.barnesandnoble.com/');
        }
      });
  }
}
