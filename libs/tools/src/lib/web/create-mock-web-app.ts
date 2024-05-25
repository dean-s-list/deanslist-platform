import { getProjects, Tree } from '@nx/devkit'
import { Linter } from '@nx/eslint'
import { applicationGenerator, componentGenerator, libraryGenerator } from '@nx/react'

export async function createMockWebApp(tree: Tree, app: string) {
  // Build the mock app and shell libs
  await applicationGenerator(tree, {
    directory: `apps/${app}`,
    e2eTestRunner: 'none',
    linter: Linter.EsLint,
    name: app,
    projectNameAndRootFormat: 'as-provided',
    routing: true,
    skipFormat: true,
    style: 'css',
  })
  // Create the shell data access lib
  await libraryGenerator(tree, {
    directory: `libs/${app}/core/data-access`,
    linter: Linter.EsLint,
    name: `${app}-shell-data-access`,
    projectNameAndRootFormat: 'as-provided',
    skipFormat: true,
    style: 'css',
  })

  // Create the shell feature lib
  await libraryGenerator(tree, {
    directory: `libs/${app}/shell/feature`,
    linter: Linter.EsLint,
    name: `${app}-core-feature`,
    projectNameAndRootFormat: 'as-provided',
    skipFormat: true,
    style: 'css',
  })

  // Create the shell feature lib
  await createMockComponent(tree, `${app}-core-feature`, `${app}-core-feature`)

  // Create the shell routes libs
  await createMockComponent(tree, `${app}-core-feature`, `shell.routes`)
  await createMockComponent(tree, `${app}-core-feature`, `shell-admin.routes`)
  await createMockComponent(tree, `${app}-core-feature`, `shell-user.routes`)
}

function createMockComponent(tree: Tree, project: string, name: string) {
  const config = getProjects(tree).get(project)
  return componentGenerator(tree, {
    name,
    directory: `${config.sourceRoot}/lib/`,
    nameAndDirectoryFormat: 'as-provided',
    style: 'none',
    skipTests: true,
  })
}
