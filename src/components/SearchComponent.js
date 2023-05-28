import React, { useState,useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addSearch, deleteSearch } from '../redux/actions';
import AppsIcon from "@material-ui/icons/Apps";
import { TextField, List, ListItem, ListItemSecondaryAction, IconButton ,Button, Avatar} from '@material-ui/core';
import { Delete ,Search, Mic, Clear} from '@material-ui/icons';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

import logoImage from '../images/logo.png'; // Import your logo image

const SearchComponent = () => {
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
      setSearchText('');
    }
    setIsSearchFocused(false);
  };
  const generateLink = () => {
    handleSearch();
    navigation (`/SearchPage?query=${encodeURIComponent(searchText || transcribedSpeech)}`);
  };

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
  
  return (
    <div style={{background:'white'}}>
        <div style={{display: 'flex',  justifyContent: 'space-between',padding: '20px 30px',alignItems: 'center',}}>
          <div style={{display: 'flex',alignItems: 'center',minWidth: '7vw',justifyContent: 'space-between',textDecoration: 'underline',fontFamily: 'Arial', fontSize: '20px', color: '#000000'}}>
            <a href="">About</a>
            <a href="">Store</a>
          </div>
          <div style={{display: 'flex',alignItems: 'center',minWidth: '13vw',justifyContent: 'space-between',fontFamily: 'Arial', fontSize: '20px', color: '#000000'}}>
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
        <div><img src={logoImage} alt="Logo" style={{ marginBottom: '0px', width: '28%', marginLeft:'15px' }} /></div>
        <Box sx={{
        width: 750,
        height: 550,
        marginLeft: '560px',
        marginTop: '24px'
      }}> 
        <div ref={textBoxRef}> 
          <TextField style={{marginBottom:'0px',marginTop:'8px'}}
            label=""
            variant="outlined"
            color='#6227ab'
            value={searchText || transcribedSpeech}
            onChange={handleInputChange}
            onFocus={() => setIsSearchFocused(true)}
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                generateLink();
              }
            }}
            fullWidth // Take full width within the container
            InputProps={{
              style: { fontFamily: 'Arial', fontSize: '24px', color: '#000000',borderTopLeftRadius: '50px',borderTopRightRadius: '50px',borderBottomLeftRadius: '50px',borderBottomRightRadius: '50px', },
              startAdornment: (
                <IconButton disabled="true" edge="start">
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
          {(!isSearchFocused || (isSearchFocused && suggestedSearches.length === 0 && remainingSearches.length === 0)) && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '15px' ,}}>
            <Button variant="contained" color='#6227ab' style={{ marginRight: '10px', fontFamily: 'Arial', fontSize: '20px',minWidth: '13vw',}} onClick={() => generateLink()}>
              Google Search
            </Button>
            <Button variant="contained" color='#6227ab' style={{ fontFamily: 'Arial', fontSize: '20px',minWidth: '13vw',}} onClick={handleSearch}>
              I'm Felling Lucky
            </Button>
          </div>
        )}
          </div>
          {isSearchFocused  && (suggestedSearches.length > 0 || remainingSearches.length > 0) && (
            <div
            ref={listRef}
            style={{
              maxHeight: '300px', // Set a fixed height for the scrollable area
              overflowY: 'auto', // Enable vertical scrolling
              marginTop: '0px', 
              display: isSearchFocused ? 'block' : 'none' 
            }}
          >
             <datalist id="suggested-searches">
              {suggestedSearches.map((search) => (
                <option key={search} value={search} />
              ))}
            </datalist>
            <List>
              {suggestedSearches.map((search,index) => (
                <ListItem
                  key={search}
                  button
                  onMouseEnter={(event) => handleListItemHover(search, event)}
                  onMouseLeave={() => setHoveredItem(null)}
                  selected={search === searchText} // Highlight selected or hovered search item
                  style={{
                    marginBottom: '0px',
                    marginLeft:'20px',
                    fontSize: '24px',
                    fontFamily: 'Arial',
                    color: hoveredItem === search ? '#43068f' : '#6227ab', // Change font color on hover
                    backgroundColor:hoveredItem === search ? '#bbb9bd':'#ffffff',
                    width:'710px',
                  }}
                  onClick={() => handleListItemClick(search)}
                >
                  {search}
                  <ListItemSecondaryAction>
                    <IconButton onClick={(event) => handleDelete(search, event)} style={{color: hoveredItem === search ? '#43068f' : '#6227ab', fontSize:'20px',marginRight:'4px'}}>
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
                    marginLeft:'20px',
                    fontFamily: 'Arial',
                    fontSize: '24px',
                    color: hoveredItem === search ? '#43068f' : '#6227ab', // Change font color on hover
                    backgroundColor:hoveredItem === search ? '#bbb9bd':'#ffffff',
                    width:'710px',
                  }}
                  onClick={() => handleListItemClick(search)}
                >
                  {search}
                  <ListItemSecondaryAction>
                    <IconButton onClick={(event) => handleDelete(search, event)} style={{color: hoveredItem === search ? '#43068f' : '#6227ab', fontSize:'20px',marginRight:'4px'}}>
                      <Delete /> REMOVE
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                
              ))}
              
            </List>
            </div>
          )}
          {isSearchFocused && (suggestedSearches.length > 0 || remainingSearches.length > 0) && (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '12px' ,}}>
            <Button variant="contained" color='#6227ab' style={{ marginRight: '10px', fontFamily: 'Arial', fontSize: '20px',minWidth: '13vw',}} onClick={() => generateLink()}>
              Google Search
            </Button>
            <Button variant="contained" color='#6227ab' style={{ fontFamily: 'Arial', fontSize: '20px',minWidth: '13vw',}} onClick={handleSearch}>
              I'm Felling Lucky
            </Button>
          </div>
            )}
          {isSearchFocused && suggestedSearches.length === 0 && remainingSearches.length === 0 && (
            <div style={{ marginTop: '0px' , fontStyle: 'italic', color: '#6227ab', backgroundColor: '#bbb9bd' ,}}></div>
          )} 
          </Box>
    </div>
  );
};

export default SearchComponent;