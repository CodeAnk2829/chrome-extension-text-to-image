# Text-to-Image Converter
## Problem Statement
Imagining images from the texts can be hard

## Solution
A **Chrome Extension** that can help users: 
- **Reading**: When reading but would not be able to imagine what is being written then a generated image can help users to imagine a picture of what has been written.
- **Creating PPTs**: Suppose wanting to give an analogy out of creativity but too much text won’t look catchy to the users, hence generating an image based on the given analogy would be a great idea.

## Architecture 
![Chrome-extension-architecture](images/architecture.png)

## How to get started with the extension?
### Step 1: Setting up the backend
- Copy and paste the link given below in your **Google Colab** notebook and run all the cells.
[Text-to-Image Model](https://colab.research.google.com/drive/1c5HfV2fZFTuelAQD53QHhkOPJbypK0ct?usp=sharing)
- Get the *ngrok* URL.
> NOTE: Don't forget to put <your_auth_token>
### Step 2: Make a fork
Fork the Text-to-Image-converter repository. This means that you'll have a copy of the repository under your-GitHub-username/repository-name.

### Step 3: Clone the repository to your local machine
```
git clone -b next https://github.com/{your-GitHub-username}/AppointyIntern/Text-to-Image-convertor.git
```

### Step 4: Add it to your Chrome extension
- Run the backend code and paste the **ngrok** URL into `background.js` file.
- Go to **Extensions** in your Chrome browser
- Enable the **Developer Mode**.
- Click on **Load unpacked** option and upload the entire folder that you cloned earlier.
- Select a prompt on a web page and click on the pencil button which comes underneath the web page.
- You will see an image based on the selected text.