# Generic UI library based on Ionic

The megashark-lib is a UI component library. It is used to centralize all the elements that will be reused
throughout the various Parsec projects (images, typography, UI components, global translation).

## 🏁 Installation

### Clone the local directory

You will need to clone the library directory locally using git.

```shell
git clone git@github.com:Scille/megashark-lib.git
```

### Install the library using npm

```shell
npm clean-install
```

## 📁 Folder names

**src** (local app): folder used to test the application locally. It includes a component display page.

**lib**: includes all the library components that you want to have in common in the library.

## Use the library in your project

> In **your project**'s `package.json` file:

Link megashark-lib to your project by adding the link to the repository:

> Example:

```shell
"megashark-lib": "git+https://github.com/Company/megashark-lib.git",
```

## Modify a megashark-lib component and see the result

> In **megashark-lib**:

```shell
npm run web:open
```

## Make modifications in **megashark-lib** and update a local project using the library at the same time

This allows you to see changes made to the library and see them displayed in real time in the project using this library.
Please follow all the commands in the order below.

### 1️⃣ Build the project and install it globally

> In **megashark-lib**

```shell
npm run build:local
```

The command includes (not to be written in the terminal):

`npm link`: to create a link to another project from a local environment.
`vite build --watch`: to rebuild automatically as soon as there is a modification.

### 2️⃣ Link the libraries from your project

> In **your project**

```shell
npm run megashark:local:start
```

The command includes (not to be written in the terminal):

`npm link megashark-lib`: allows you to link the megashark-lib library (installed from the machine to github)

### 3️⃣ Start development

> In **your project**

```shell
# For web project
npm run web:open

# For electron project
npm run electron:open
```

### 4️⃣ Reset installation to state (with remote project)

⚠️ Required to keep the project with the remote link.

> In **your project**

```shell
npm run megashark:local:stop
```

→ All modifications made in real time in **megashark-lib** are instantly visible without reload/rebuild!
