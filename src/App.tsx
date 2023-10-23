import { BaseSyntheticEvent, useEffect, useState } from 'react'
import './App.css'
import { Search, Location, Link, Sun, Twitter, Building } from './assets/Icons'
import { useTheme } from './context/ThemeContext'
import { format, set } from 'date-fns'

type UserGitHub = {
  login: string,
  id: number,
  node_id: string,
  avatar_url: string,
  gravatar_id: string,
  url: string,
  html_url: string,
  followers_url: string,
  following_url: string,
  gists_url: string,
  starred_url: string,
  subscriptions_url: string,
  organizations_url: string,
  repos_url: string,
  events_url: string,
  received_events_url: string,
  type: string,
  site_admin: boolean,
  name: string,
  company: string,
  blog: string,
  location: string,
  email: string,
  hireable: string,
  bio: string,
  twitter_username: string,
  public_repos: number,
  public_gists: number,
  followers: number,
  following: number,
  created_at: string,
  updated_at: string
}

const notAvailable = 'Not Available'

const notBio = 'This profile has no bio'

function App() {

  const [username, setUsername] = useState<string>('')

  const [userGithub, setUserGithub] = useState<UserGitHub>()

  const { isDarkMode, setIsDarkMode } = useTheme()

  const [userJoined, setUserJoined] = useState<string>('')

  useEffect(() => {
    onSearch('octocat')
  }, [])


  function onSearch(username: string) {
    fetch(`https://api.github.com/users/${username}`).then((response) => {
      return response.json()
    }).then(data => {
      setUserGithub(data)
      setUserJoined(format(new Date(data.created_at), 'dd MMM yyyy'))
    })
  }


  function onChange(e: BaseSyntheticEvent) {
    setUsername(e.target.value)
  }

  return (
    <>
      <main>
        <header>
          <h1>devfinder</h1>
          <button className={isDarkMode ? 'buttonThemeMode dark' : 'buttonThemeMode'}
            onClick={() => {
              document.body.classList.toggle('darkMode')
              setIsDarkMode(!isDarkMode)
            }}>
            <p>Light</p>
            <Sun />
          </button>
        </header>

        <div className='inputContainer'>
          <div className='inputContent'>
            <Search />
            <input type='text' placeholder='Search Github username...' value={username} onChange={onChange} ></input>
          </div>
          <button className='searchButton' onClick={() => {
            onSearch(username)
          }}>search</button>
        </div>


        <div className='userCard'>
          <img className='userImage' src={userGithub?.avatar_url} alt='imagen del usuario de ...' />
          <div>
            <header className='usernameContainer'>
              <h3 className='name'>{userGithub?.name}</h3>
              <h3 className='userJoined'>Joined {userJoined}</h3>
            </header>


            <h4 className='userName'>@{userGithub?.login}</h4>
            <h4 className='userBio'>{userGithub?.bio ? userGithub.bio : notBio}</h4>

            <div className='userInteractions'>
              <div>
                <h5>Repos</h5>
                <p>{userGithub?.public_repos}</p>
              </div>

              <div>
                <h5>Followers</h5>
                <p>{userGithub?.followers}</p>
              </div>

              <div>
                <h5>Following</h5>
                <p>{userGithub?.following}</p>
              </div>
            </div>

            <footer>
              <div>
                <Location color={isDarkMode ? !userGithub?.location ? '#C6C6C6' : 'currentColor' : !userGithub?.location ? '#94aed6' : 'currentColor'} />
                <p style={!userGithub?.location ? { opacity: '0.5' } : {}}>{userGithub?.location ? userGithub.location : notAvailable}</p>
              </div>

              <div>
                <Link color={isDarkMode ? !userGithub?.blog ? '#C6C6C6' : 'currentColor' : !userGithub?.blog ? '#94aed6' : 'currentColor'} />
                <p style={!userGithub?.blog ? { opacity: '0.5' } : {}}>{userGithub?.blog ? userGithub.blog : notAvailable}</p>
              </div>

              <div>

                <Twitter color={isDarkMode ? !userGithub?.twitter_username ? '#C6C6C6' : 'currentColor' : !userGithub?.twitter_username ? '#94aed6' : 'currentColor'}
                />
                <p style={!userGithub?.twitter_username ? { opacity: '0.5' } : {}}>{userGithub?.twitter_username ? userGithub.twitter_username : notAvailable}</p>
              </div>

              <div>
                <Building color={isDarkMode ? !userGithub?.company ? '#C6C6C6' : 'currentColor' : !userGithub?.company ? '#94aed6' : 'currentColor'} />
                <p style={!userGithub?.company ? { opacity: '0.5' } : {}}>{userGithub?.company ? userGithub.company : notAvailable}</p>
              </div>

            </footer>

          </div>
        </div>
      </main>

    </>
  )
}

export default App
