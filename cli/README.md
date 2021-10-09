#wya-app cli tool

## Installation
At the root of this directory run the command `npm install -g .` in order to install the tool. You may need to elevate privileges in order to use the `-g` flag.

## Commands

### --version
`wya-app --version` : displays the current version

### create
`wya-app create <type> <name>` : with the given name, create the React boilerplate for the given type

- component [c] : `wya-app create component <name>` or `wya-app create c <name>`
    **Components must be named in pascal case!**
    For example: `wya-app create c FriendsList` creates the files
    - `**/*/FriendsList.tsx`
    - `**/*/FriendsList.spec.tsx`
    - `**/*/FriendsList.css`

- context [cx] : `wya-app create context <name>` or `wya-app create cx <name>`
    **Contexts must be named in pascal case!**
    **Do not add the 'Context' suffix! The tool automatically suffixes with 'Context'**
    For example: `wya-app create cx User` creates a file `**/*/UserContext.tsx`.

- page [p] : `wya-app create page <name>` or `wya-app create p <name>` 
    **Pages must be named in pascal case!**
    **Do not add the 'Page' suffix! The tool automatically suffixes with 'Page'**
    For example: `wya-app create p Profile` creates the files
    - `**/*/ProfilePage.tsx`
    - `**/*/ProfilePage.spec.tsx`
    - `**/*/ProfilePage.css`