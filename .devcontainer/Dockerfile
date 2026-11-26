# Update the NODE_VERSION arg to pick a Node.js major version.
ARG NODE_VERSION=26-bookworm
FROM mcr.microsoft.com/devcontainers/javascript-node:${NODE_VERSION}

# VARIANT can be either 'hugo' for the standard version or 'hugo_extended' for the extended version.
ARG VARIANT=hugo_extended
# VERSION can be either 'latest' or a specific version number
ARG VERSION=0.169.0
ARG DART_SASS_VERSION=1.98.0

# Download Hugo and Dart Sass
RUN apt-get update && apt-get install -y ca-certificates openssl git curl && \
    rm -rf /var/lib/apt/lists/* && \
    case ${VERSION} in \
    latest) \
    export VERSION=$(curl -s https://api.github.com/repos/gohugoio/hugo/releases/latest | grep "tag_name" | awk '{print substr($2, 3, length($2)-4)}') ;;\
    esac && \
    echo ${VERSION} && \
    case $(uname -m) in \
    aarch64|arm64) \
    export HUGO_ARCH=arm64; export SASS_ARCH=linux-arm64 ;; \
    *) \
    export HUGO_ARCH=64bit; export SASS_ARCH=linux-x64 ;; \
    esac && \
    echo ${HUGO_ARCH} && \
    if [ "${HUGO_ARCH}" = "arm64" ]; then \
      HUGO_URL=https://github.com/gohugoio/hugo/releases/download/v${VERSION}/${VARIANT}_${VERSION}_linux-${HUGO_ARCH}.tar.gz; \
    else \
      HUGO_URL=https://github.com/gohugoio/hugo/releases/download/v${VERSION}/${VARIANT}_${VERSION}_Linux-${HUGO_ARCH}.tar.gz; \
    fi && \
    wget -O ${VERSION}.tar.gz "${HUGO_URL}" && \
    tar xf ${VERSION}.tar.gz && \
    mv hugo /usr/bin/hugo && \
    rm ${VERSION}.tar.gz && \
    curl -fsSL "https://github.com/sass/dart-sass/releases/download/${DART_SASS_VERSION}/dart-sass-${DART_SASS_VERSION}-${SASS_ARCH}.tar.gz" \
      | tar -xz -C /opt && \
    ln -s /opt/dart-sass/sass /usr/local/bin/sass

# Hugo dev server port
EXPOSE 1313

# [Optional] Uncomment this section to install additional OS packages you may want.
#
# RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
#     && apt-get -y install --no-install-recommends <your-package-list-here>

# [Optional] Uncomment if you want to install more global node packages
# RUN sudo -u node npm install -g <your-package-list-here>
