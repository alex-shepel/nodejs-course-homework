const fs = require('fs/promises');
const path = require('path');
const { User } = require('../../models/user');

const publicDir = path.join(__dirname, '../../', 'public');

const updateAvatar = async (req, res) => {
  try {
    const { id } = req.user;
    const { filename, path: filepath } = req.file;
    const newFilename = `${id}-${filename}`;
    const newFilepath = path.join(publicDir, 'avatars', newFilename);
    await fs.rename(filepath, newFilepath);
    const avatarURL = path.join('avatars', newFilename);
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { avatarURL },
      { new: true },
    );
    const deprecatedFilepath = path.join(publicDir, req.user.avatarURL);
    await fs.unlink(deprecatedFilepath);
    res.json({ avatarURL: updatedUser.avatarURL });
  } catch (err) {
    if (err.message.includes('no such file')) {
      await fs.unlink(req.file);
    }
    throw err;
  }
};

module.exports = updateAvatar;
