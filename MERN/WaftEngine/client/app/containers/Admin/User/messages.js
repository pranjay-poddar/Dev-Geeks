/*
 * User Messages
 *
 * This contains all the text for the User container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.User';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the User container!',
  },
});
