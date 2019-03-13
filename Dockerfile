# Use a python base image, building atop of that one
FROM edwinvanrooij/myubuntu

# Set current working dir
WORKDIR /app

# Copy the current dir into the newly created directory /app under the root filesystem in image
ADD . /app

# Run a command once inside environment
RUN npm install

# Set port open to outside container
EXPOSE 3000

# Run command when container launches
CMD ["npm", "start"]
