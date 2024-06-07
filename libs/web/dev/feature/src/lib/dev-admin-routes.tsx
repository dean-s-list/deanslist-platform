import { UiContainer, UiTabRoutes } from '@pubkey-ui/core'
import { DevComponents } from './dev-components'
import { DevEditor } from './dev-editor'
import { DevIdentityWizard } from './dev-identity-wizard'
import { DevNew } from './dev-new'
import { DevUserAutocomplete } from './dev-user-autocomplete'

export default function DevAdminRoutes() {
  return (
    <UiContainer>
      <UiTabRoutes
        grow={false}
        tabs={[
          { path: 'new', label: 'New', element: <DevNew /> },
          { path: 'editor', label: 'Editor', element: <DevEditor /> },
          { path: 'identity-wizard', label: 'Identity Wizard', element: <DevIdentityWizard /> },
          { path: 'user-autocomplete', label: 'User Autocomplete', element: <DevUserAutocomplete /> },
          { path: 'components', label: 'Components', element: <DevComponents /> },
        ]}
      />
    </UiContainer>
  )
}
