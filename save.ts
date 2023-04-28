// # name: Deploy to Docker Compose

// # on:
// #   push:
// #     branches:
// #       - deploy

// # jobs:
// #   build:
// #     runs-on: ubuntu-latest
// #     environment:
// #       name: deploy
// #     steps:
// #     - uses: actions/checkout@v3
// #     - name: Install Node.js
// #       uses: actions/setup-node@v3
// #       with:
// #         node-version: '16.x'
// #     - name: Install npm dependencies
// #       run: npm install
// #     - name: Run build task
// #       run: npm run build --if-present
// #     - name: Deploy to Server
// #       uses: easingthemes/ssh-deploy@main
// #       env:
// #           SSH_PRIVATE_KEY: ${{ secrets.SSH_PRIVATE_KEY }}
// #           ARGS: "-rlgoDzvc -i --delete"
// #           SOURCE: "dist/"
// #           REMOTE_HOST: ${{ secrets.REMOTE_HOST }}
// #           REMOTE_USER: ${{ secrets.REMOTE_USER }}
// #           TARGET: ${{ secrets.REMOTE_TARGET }}
// #           EXCLUDE: "/dist/, /node_modules/"
// #           SCRIPT_BEFORE: |
// #             whoami
// #             ls -al
// #           SCRIPT_AFTER: |
// #             whoami
// #             ls -al
// #             echo $RSYNC_STDOUT