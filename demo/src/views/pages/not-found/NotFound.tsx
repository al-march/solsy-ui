import {Page} from '@page/base';
import {Points} from '@shared/router/Points';
import {Link} from 'solid-app-router';
import {Component} from 'solid-js';

export const NotFound: Component = () => {
  return (
    <Page full>
      <div class="hero h-full bg-base-100">
        <div class="text-center hero-content">
          <div class="max-w-md">
            <h1 class="text-9xl font-bold">404</h1>
            <p class="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>

            <Link href={Points.HOME}>
              <button class="btn btn-primary">To main page</button>
            </Link>
          </div>
        </div>
      </div>
    </Page>
  );
};
