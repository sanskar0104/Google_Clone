import React, { useState,useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addSearch, deleteSearch } from '../redux/actions';
import AppsIcon from "@material-ui/icons/Apps";
import { TextField, List, ListItem, ListItemSecondaryAction, IconButton,Avatar} from '@material-ui/core';
import { Delete ,Search, Mic, Clear} from '@material-ui/icons';
import { Link,} from 'react-router-dom';
import SearchIcon from "@material-ui/icons/Search";
import DescriptionIcon from "@material-ui/icons/Description";
import ImageIcon from "@material-ui/icons/Image";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import RoomIcon from "@material-ui/icons/Room";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import logoImage from '../images/logo.png'; // Import your logo image
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import Logo from "../images/google-pagination-logo.png";
import useGoogleSearchImage from "../useGoogleSearchImage";

const SearchPage =()=> {
  const recentSearches = useSelector((state) => state.recentSearches);
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const listRef = useRef(null);
  const textBoxRef = useRef(null);
  const [speechRecognition, setSpeechRecognition] = useState(null);
  const [transcribedSpeech, setTranscribedSpeech] = useState('');
  const [isListening, setIsListening] = useState(false);
  const navigation = useNavigate();
  
  useEffect(() => {
    window.scrollTo(0, 0);
},);

  // LIVE API CALL

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handleSearch = () => {
    if (searchText.trim() !== '') {
      dispatch(addSearch(searchText.trim()));
    }
    setIsSearchFocused(false);
    navigation (`/SearchPage?query=${encodeURIComponent(searchText || transcribedSpeech)}`);
  };
    const query = queryParams.get('query');
    const searchnum=31;
    const { data } = useGoogleSearchImage(query,searchnum);
    console.log(data);
  const handleDelete = (search,event) => {
    event.stopPropagation();
    dispatch(deleteSearch(search));
  };

  const handleListItemClick = (search) => {
    setSearchText(search);
  };

  const handleListItemHover = (search, event) => {
    event.stopPropagation();
    setHoveredItem(search);
  };

  const handleInputChange = (event) => {
    event.stopPropagation();
    const value = event.target.value;
    const inputText = event.target.value;
    setTranscribedSpeech(inputText);
    setSearchText(value);
  };

  const handleClear = () => {
    setSearchText('');
    setTranscribedSpeech('');
  };
  
    const handleSpeechRecognition = () => {
    if (!isListening) {
      if (speechRecognition) {
        setSearchText('');
        setTranscribedSpeech('');
        speechRecognition.start();
        setIsListening(true);
      }
    } else {
      if (speechRecognition) {
        speechRecognition.stop();
        setIsListening(false);
  
        if (transcribedSpeech.trim() !== '') {
          setSearchText(transcribedSpeech.trim());
        } else {
          setSearchText('');
        }
  
        handleSearch();
      }
    }
  };
    
  const suggestedSearches = recentSearches.filter(
    (search) => search.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
  );

  const remainingSearches = recentSearches.filter(
    (search) => search.toLowerCase().indexOf(searchText.toLowerCase()) === -1
  );

  const clickNum1 = () =>{
    navigation (`/SearchPageImage?query=${encodeURIComponent(searchText || transcribedSpeech)}`);
  }
  const clickNum2 = () =>{
    navigation (`/SearchPageImage2?query=${encodeURIComponent(searchText || transcribedSpeech)}`);
  }
  const clickNum3 = () =>{
    navigation (`/SearchPageImage3?query=${encodeURIComponent(searchText || transcribedSpeech)}`);
  }
  const clickNum4 = () =>{
    navigation (`/SearchPageImage4?query=${encodeURIComponent(searchText || transcribedSpeech)}`);
  }
  const clickNum5 = () =>{
    navigation (`/SearchPageImage5?query=${encodeURIComponent(searchText || transcribedSpeech)}`);
  }
  const clickNum6 = () =>{
    navigation (`/SearchPageImage6?query=${encodeURIComponent(searchText || transcribedSpeech)}`);
  }
  const clickNum7 = () =>{
    navigation (`/SearchPageImage7?query=${encodeURIComponent(searchText || transcribedSpeech)}`);
  }
  const clickNum8 = () =>{
    navigation (`/SearchPageImage8?query=${encodeURIComponent(searchText || transcribedSpeech)}`);
  }
  const clickNum9 = () =>{
    navigation (`/SearchPageImage9?query=${encodeURIComponent(searchText || transcribedSpeech)}`);
  }
  const clickNum10 = () =>{
    navigation (`/SearchPageImage10?query=${encodeURIComponent(searchText || transcribedSpeech)}`);
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        textBoxRef.current &&
        !textBoxRef.current.contains(event.target) &&
        listRef.current &&
        !listRef.current.contains(event.target)
      ) {
        setIsSearchFocused(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const recognition = new window.webkitSpeechRecognition() || new window.SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    
    recognition.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';
  
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' ';
        } else {
          interimTranscript += transcript;
        }
      }
  
      setTranscribedSpeech(finalTranscript);
      setSearchText(interimTranscript);
    };
  
    setSpeechRecognition(recognition);
  
    return () => {
      recognition.stop();
    };
  }, []);

  useEffect(() => {
    
    if (query) {
      setSearchText(query);
    }
  }, []);

    

 
  return (
    <div>
    <div style={{display: 'flex'}}>  
    <div style={{ width: '180px', marginLeft:'20px' }}><Link to='/'><img src={logoImage} alt="Logo" style={{ maxWidth: '100%', maxHeight: '100%',}} /></Link></div>
    <div style={{ width: '920px', marginLeft: '35px', marginTop:'21px'}}  >
        <div ref={textBoxRef}> 
          <TextField style={{marginBottom:'0px',}}
            label=""
            variant="outlined"
            value={searchText || transcribedSpeech}
            onChange={handleInputChange}
            onFocus={() => setIsSearchFocused(true)}
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                handleSearch();
              }
            }}
            fullWidth // Take full width within the container
            InputProps={{
              style: { fontFamily: 'Arial', fontSize: '24px', color: '#000000',borderTopLeftRadius: '50px',borderTopRightRadius: '50px',borderBottomLeftRadius: '50px',borderBottomRightRadius: '50px', },
              startAdornment: (
                <IconButton onClick={handleSearch} edge="start">
                  <Search />
                </IconButton>
              ),
              endAdornment: (
                <>
                {searchText && ( // Only show clear button when there is input
               <IconButton onClick={handleClear} edge="start">
                <Clear />
              </IconButton>
              )}
                <div style={{ borderLeft: '2px solid #edebed',height: '60px',marginRight: '12px'}}></div>
                <IconButton onClick={handleSpeechRecognition} edge="start">
                  <Mic color={isListening ? 'primary' : 'inherit'}/>
                </IconButton>
                </>
              ),
              list: 'suggested-searches', // Use the 'suggested-searches' ID for autofill
            }}
            placeholder="Google Search or Enter any URL" // Add placeholder text here
          />
          </div>
          {isSearchFocused  && (suggestedSearches.length > 0 || remainingSearches.length > 0) && (
            <div
            ref={listRef}
            style={{
              maxHeight: '250px', // Set a fixed height for the scrollable area
              overflowY: 'auto', // Enable vertical scrolling
              marginTop: '0px', 
              display: isSearchFocused ? 'block' : 'none', 
            }}
          >
             <datalist id="suggested-searches" >
              {suggestedSearches.map((search) => (
                <option key={search} value={search} />
              ))}
            </datalist>
            <List style={{zIndex: 2,position: 'absolute',width: '824px',maxHeight: '300px',overflowY: 'auto',marginLeft:'35px',}}>
              {suggestedSearches.map((search,index) => (
                <ListItem
                  key={search}
                  button
                  onMouseEnter={(event) => handleListItemHover(search, event)}
                  onMouseLeave={() => setHoveredItem(null)}
                  selected={search === searchText} // Highlight selected or hovered search item
                  style={{
                    marginBottom: '0px',
                    fontSize: '24px',
                    fontFamily: 'Arial',
                    borderLeft:'1px solid #bbb9bd',
                    borderRight:'1px solid #bbb9bd',
                    borderBottom:'1px solid #bbb9bd',
                    color: hoveredItem === search ? '#43068f' : '#6227ab', // Change font color on hover
                    backgroundColor:hoveredItem === search ? '#bbb9bd' : '#ffffff',
                  }}
                  onClick={() => handleListItemClick(search)}
                >
                  {search}
                  <ListItemSecondaryAction>
                    <IconButton onClick={(event) => handleDelete(search, event)} style={{color: hoveredItem === search ? '#43068f' : '#6227ab', }}>
                      <Delete /> REMOVE
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
              {remainingSearches.map((search,index) => (
                <ListItem
                  key={search}
                  button
                  onMouseEnter={(event) => handleListItemHover(search, event)}
                  onMouseLeave={() => setHoveredItem(null)}
                  selected={search === searchText} // Highlight selected or hovered search item
                  style={{
                    marginBottom: '0px',
                    fontFamily: 'Arial',
                    fontSize: '24px',
                    borderLeft:'1px solid #bbb9bd',
                    borderRight:'1px solid #bbb9bd',
                    borderBottom:'1px solid #bbb9bd',
                    color: hoveredItem === search ? '#43068f' : '#6227ab', // Change font color on hover
                    backgroundColor:hoveredItem === search ? '#bbb9bd' : '#ffffff',
                  }}
                  onClick={() => handleListItemClick(search)}
                >
                  {search}
                  <ListItemSecondaryAction>
                    <IconButton onClick={(event) => handleDelete(search, event)} style={{color: hoveredItem === search ? '#43068f' : '#6227ab', }}>
                      <Delete /> REMOVE
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                
              ))}              
            </List>
            </div>
          )}
          {isSearchFocused && suggestedSearches.length === 0 && remainingSearches.length === 0 && (
            <div style={{ marginTop: '0px' , fontStyle: 'italic', color: '#6227ab', backgroundColor: '#bbb9bd'}}></div>
          )} 
        </div>
        <div style={{display: 'flex',marginLeft:'410px', alignItems: 'center',minWidth: '16vw',justifyContent: 'space-between',fontFamily: 'Arial', fontSize: '20px', color: '#000000'}}>
            <a href="">Gmail</a>
            <a href="">Images</a>
            <a href=""><AppsIcon /></a>
            <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>S</Avatar>
          </IconButton>
          <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
        </div>
        </div>
        
        <div >
        <div className="searchPage__headerBody" style={{marginTop:'8px'}}>
          <div className="searchPage_options" style={{display: 'flex'}}>
            <div className="searchPage_optionsLeft" style={{display: 'flex', marginLeft:'235px', alignItems: 'center',minWidth: '26vw',justifyContent: 'space-between',fontFamily: 'Arial', fontSize: '16px', color: '#000000'}}>
              <div className="searchPage_option" style={{display: 'flex',}}>
                <SearchIcon style={{color:'#aba8ad',fontSize:'16px'}}/>
                <a onClick={()=>navigation(`/SearchPage?query=${encodeURIComponent(searchText || transcribedSpeech)}`)} style={{color:'#aba8ad',textDecoration:'underline'}}>All</a>
              </div>
              <div className="searchPage_option" style={{display: 'flex',}}>
                <DescriptionIcon style={{color:'#aba8ad',fontSize:'16px'}}/>
                <a href="/SearchPage" style={{color:'#aba8ad',}}>News</a>
              </div>
              <div className="searchPage_option" style={{display: 'flex',}}>
                <ImageIcon style={{color:'blue',fontSize:'16px'}}/>
                <a href="/SearchPage" style={{color:'blue',}}>Images</a>
              </div>
              <div className="searchPage_option" style={{display: 'flex',}}>
                <LocalOfferIcon style={{color:'#aba8ad',fontSize:'16px'}}/>
                <a href="/SearchPage" style={{color:'#aba8ad',}}>Shopping</a>
              </div>
              <div className="searchPage_option" style={{display: 'flex',}}>
                <RoomIcon style={{color:'#aba8ad',fontSize:'16px'}}/>
                <a href="/SearchPage" style={{color:'#aba8ad',}}>Maps</a>
              </div>
              <div className="searchPage_option" style={{display: 'flex',}}>
                <MoreVertIcon style={{color:'#aba8ad',fontSize:'16px'}}/>
                <a href="/SearchPage" style={{color:'#aba8ad',}}>More</a>
              </div>
            </div>

            <div className="searchPage_optionsRight" style={{display: 'flex', marginLeft:'300px', alignItems: 'center',minWidth: '6vw',justifyContent: 'space-between',fontFamily: 'Arial', fontSize: '16px', color: '#000000'}}>
              <div className="searchPage_option">
              <a href="/SearchPage" style={{color:'#aba8ad',}}>Settings</a>
              </div>
              <div className="searchPage_option">
              <a href="/SearchPage" style={{color:'#aba8ad',}}>Tools</a>
              </div>
            </div>
          </div>
        </div>  
        </div>
        <hr style={{height:'2px',borderWidth:'0px',color:'gray',backgroundColor:'#aba8ad',width:'100%', marginTop:'50px'}}></hr> 
        {query && (
        <div className="searchPage__results">
          <p className="searchPage__resultCount">
            About {data?.searchInformation.formattedTotalResults} results (
            {data?.searchInformation.formattedSearchTime} seconds) for {query}
          </p>
          <Grid container rowSpacing={2} columnSpacing={4}>
          {data?.items.map((item) => (
                        <Grid item xs={6}>
                        <box style={{height:'200px', width:'300px', marginRight:'10px',}}>
                        <a href={item.link}target="_blank">
                              <img
                                className="searchPage__resultImage"
                                src={item.link}
                                alt=""
                                style={{height:'200px',width:'300px',marginleft:'5px'}}
                              />
                        </a>
                        <a className="searchPage__resultTitle" href={item.image.contextLink}target="_blank" style={{marginTop:'3px',width:'250px',fontSize:'15px'}}>
                          {item.title}
                        </a>
                        </box>
                        </Grid>
          ))}</Grid>
            <div className="flex flex-col items-center py-14 max-w-[700px]"style={{marginTop:'100px',marginLeft:'100px'}}>
            <div className="relative text-[#4285f4]" style={{display:'flex'}}>
                {data?.queries.previousPage && (
                    <div>
                        <FiChevronLeft size={20} className="cursor-pointer" style={{marginLeft:'10px'}} />
                        <span className="cursor-pointer absolute left-[-5px] top-[30px] hidden md:block" style={{marginLeft:'5px'}}>
                            Prev
                        </span>
                    </div>
                )}
                <img className="w-[250px] md:w-[300px]" src={Logo} style={{width:'250px',marginLeft:'15px',marginRight:'15px'}}/>
                {data?.queries.nextPage && (
                    <div>
                        
                        <span className="cursor-pointer absolute left-[-5px] top-[30px] hidden md:block">
                            Next
                        </span>
                        <FiChevronRight size={20} className="cursor-pointer" />
                    </div>
                )}
            </div>
            <div style={{display:'flex', marginLeft:'40px'}}>
                <div onClick={()=>clickNum1()} style={{textDecoration:'underline',color:'blue',marginLeft:'75px',marginRight:'10px',fontSize:'12px'}}>1</div>
                <div onClick={()=>clickNum2()} style={{textDecoration:'underline',color:'blue',marginRight:'10px',fontSize:'12px'}}>2</div>
                <div onClick={()=>clickNum3()} style={{textDecoration:'underline',color:'blue',marginRight:'10px',fontSize:'12px'}}>3</div>
                <div onClick={()=>clickNum4()} style={{textDecoration:'underline',color:'blue',marginRight:'10px',fontSize:'12px'}}>4</div>
                <div onClick={()=>clickNum5()} style={{textDecoration:'underline',color:'blue',marginRight:'10px',fontSize:'12px'}}>5</div>
                <div onClick={()=>clickNum6()} style={{textDecoration:'underline',color:'blue',marginRight:'10px',fontSize:'12px'}}>6</div>
                <div onClick={()=>clickNum7()} style={{textDecoration:'underline',color:'blue',marginRight:'10px',fontSize:'12px'}}>7</div>
                <div onClick={()=>clickNum8()} style={{textDecoration:'underline',color:'blue',marginRight:'10px',fontSize:'12px'}}>8</div>
                <div onClick={()=>clickNum9()} style={{textDecoration:'underline',color:'blue',marginRight:'10px',fontSize:'12px'}}>9</div>
                <div onClick={()=>clickNum10()} style={{textDecoration:'underline',color:'blue',marginRight:'10px',fontSize:'12px'}}>10</div>
            </div>
        </div>

        </div>
      )}
      </div>
  );
}

export default SearchPage;