function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve({ id: id, name: 'Sharzil' });
    }, 2000);
  });
}
async function getUserData() {
  try {
    console.log('Fetching User Data');

    const user = await getUser(1);
    console.log('User data fetche Successfully');
    console.log(user);
  } catch (error) {
    console.error('error', error);
  }
}

// getUserData();

const fetchPost = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Post Fetched Successfully');
    },  500);
  });
};

const fetchComment = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Comment Fetched Successfully');
    }, 3000);
  });
};

async function getBlogdata() {
  try {
    const [postData, CommentData] = await Promise.all([
      fetchPost(),
      fetchComment(),
    ]);

    console.log(postData);
    console.log(CommentData);
  } catch (error) {
    console.error('Error', error);
  }
}

getBlogdata();
