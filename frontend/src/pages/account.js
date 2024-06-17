import React, { Component } from 'react';
import { AuthContext } from '../context/AuthContext';
import { UserContext } from '../context/UserContext';
import { Link } from 'react-router-dom';


class Account extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      isEditingEmail: false,
      isEditingPhone: false,
      editedEmail: '',
      editedPhone: '',
      successMessage: '',
      selectedFile: null,
      isUploading: false,
      isModalOpen: false,
      isHoveringAvatar: false,
      avatarWidth: null,
      previewUrl: null,
    };
    this.avatarRef = React.createRef();
  }

  componentDidMount() {
    this.setAvatarWidth();
  }

  setAvatarWidth = () => {
    // Get the width of the avatar image and update the state
    if (this.avatarRef.current) {
      const width = this.avatarRef.current.clientWidth;
      this.setState({ avatarWidth: width });
    }
  };

  handleEditClick = (type, user) => {
    if (type === 'email') {
      this.setState({
        isEditingEmail: true,
        editedEmail: user.email,
        successMessage: ''
      });
    } else if (type === 'phone') {
      this.setState({
        isEditingPhone: true,
        editedPhone: user.phone,
        successMessage: ''
      });
    }
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSaveClick = (type, updateUser, user) => {
    if (type === 'email') {
      updateUser(user.user_id, { ...user, email: this.state.editedEmail })
        .then(() => {
          this.setState({
            isEditingEmail: false,
            successMessage: 'Email updated successfully.'
          });
          window.location.reload();
        })
        .catch((error) => {
          console.error('Error updating email:', error);
        });
    } else if (type === 'phone') {
      updateUser(user.user_id, { ...user, phone: this.state.editedPhone })
        .then(() => {
          this.setState({
            isEditingPhone: false,
            successMessage: 'Phone updated successfully.'
          });
          window.location.reload();
        })
        .catch((error) => {
          console.error('Error updating phone:', error);
        });
    }
  };

  handleFileChange = (event) => {
    const file = event.target.files[0];
    this.setState({
      selectedFile: file,
      previewUrl: URL.createObjectURL(file)
    });
  };

  handleUploadClick = (updateUser, user) => {
    const { selectedFile } = this.state;
    if (!selectedFile) return;
  
    this.setState({ isUploading: true });
  
    const formData = new FormData();
    formData.append('avatar', selectedFile);
    formData.append('avatarContentType', selectedFile.type);
  
    updateUser(user.user_id, formData)
      .then(() => {
        // Reset local state
        this.setState({
          selectedFile: null,
          isUploading: false,
          previewUrl: null,
          successMessage: 'Avatar updated successfully.',
        });
        window.location.reload();
      })
      .catch(error => {
        console.error('Error updating avatar:', error);
        this.setState({ isUploading: false });
      });
  };

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false, previewUrl: null });
  };

  handleAvatarMouseEnter = () => {
    this.setState({ isHoveringAvatar: true });
  };

  handleAvatarMouseLeave = () => {
    this.setState({ isHoveringAvatar: false });
  };

  render() {
    const { isLoggedIn, user } = this.context;
    const { isEditingEmail, editedEmail, isEditingPhone, editedPhone, successMessage, isUploading, isModalOpen, avatar, isHoveringAvatar, avatarWidth, previewUrl} = this.state;
    
    return (
      <UserContext.Consumer>
        {({ updateUser, loading, error }) => (
          <section className='py-20'>
            <div className='container mx-auto p-12'>
              <div className="max-w-lg mx-auto mt-8">
                {isLoggedIn ? (
                  <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
                    <h1 className="text-2xl font-bold mb-4">Welcome, {user.account}</h1>
                    <p className="text-gray-700 mb-4">Quản lý hồ sơ của bạn</p>
                    {successMessage && (
                      <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                        <span className="block sm:inline">{successMessage}</span>
                      </div>
                    )}
                    <div className="mb-4 relative" 
                         onMouseEnter={this.handleAvatarMouseEnter}
                         onMouseLeave={this.handleAvatarMouseLeave}>
                      <img src={`https://m8mp78nj-8000.asse.devtunnels.ms/api/avatar/${user.user_id}`} alt="Avatar" className={`w-20 h-20 rounded-full mb-4`} ref={this.avatarRef} />
                      {isHoveringAvatar && (
                        <div className="absolute top-0 left-0" style={{ width: avatarWidth }} onClick={this.openModal}>
                          <div className="bg-black opacity-50 rounded-full flex items-center justify-center h-20">
                            <span className="text-white font-bold">Change</span>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="mb-4">
                      <p className="text-gray-700"><strong>Account:</strong> {user.account}</p>
                    </div>
                    <div className="mb-4 flex flex-row gap-2">
                      <p className="text-gray-700"><strong>Password:</strong> *********</p>
                      <Link to="/changePassword" className="text-blue-300 underline">Change password</Link>
                    </div>
                    <div className="mb-4 flex flex-row gap-2">
                      <p className="text-gray-700"><strong>Email:</strong></p>
                      {isEditingEmail ? (
                        <>
                          <input
                            type="text"
                            name="editedEmail"
                            value={editedEmail}
                            onChange={this.handleInputChange}
                            className="border rounded px-2 py-1 mr-2"
                            placeholder="Enter new email"
                          />
                          <button
                            onClick={() => this.handleSaveClick('email', updateUser, user)}
                            className="bg-blue-500 text-white px-2 py-1 rounded"
                          >
                            Submit
                          </button>
                        </>
                      ) : (
                        <>
                          <p className="text-gray-700">{user.email}</p>
                          <button
                            onClick={() => this.handleEditClick('email', user)}
                            className="text-blue-300 underline"
                          >
                            Change Email
                          </button>
                        </>
                      )}
                    </div>
                    <div className="mb-4 flex flex-row gap-2">
                      <p className="text-gray-700"><strong>Phone:</strong></p>
                      {isEditingPhone ? (
                        <>
                          <input
                            type="text"
                            name="editedPhone"
                            value={editedPhone}
                            onChange={this.handleInputChange}
                            className="border rounded px-2 py-1 mr-2"
                            placeholder="Enter new phone"
                          />
                          <button
                            onClick={() => this.handleSaveClick('phone', updateUser, user)}
                            className="bg-blue-500 text-white px-2 py-1 rounded"
                            >
                              Submit
                            </button>
                          </>
                        ) : (
                          <>
                            <p className="text-gray-700">{user.phone}</p>
                            <button
                              onClick={() => this.handleEditClick('phone', user)}
                              className="text-blue-300 underline"
                            >
                              Change Phone
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
                      <h1 className="text-2xl font-bold mb-4">Please <Link to='/login'>login</Link> to view your account</h1>
                    </div>
                  )}
                  {loading && <p>Loading...</p>}
                  {error && <p className="text-red-500">{error}</p>}
                </div>
              </div>
              {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                  <div className="bg-white p-8 rounded-md max-w-lg">
                    <h2 className="text-lg font-bold mb-4">Upload New Avatar</h2>
                    <input type="file" accept="image/*" onChange={this.handleFileChange} className="mb-4" />
                    {previewUrl && (
                      <div className="mb-4">
                        <img src={previewUrl} alt="Preview" className="w-20 h-20 rounded-full" />
                      </div>
                    )}
                    <button
                      onClick={() => {
                        this.handleUploadClick(updateUser, user);
                        this.closeModal();
                      }}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                      disabled={isUploading}
                    >
                      {isUploading ? 'Uploading...' : 'Upload'}
                    </button>
                    <button onClick={this.closeModal} className="ml-4 text-gray-700 hover:text-gray-900">Cancel</button>
                  </div>
                </div>
              )}
            </section>
          )}
        </UserContext.Consumer>
      );
    }
  }
  
  export default Account;
