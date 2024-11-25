import React from 'react';
import { Navbar, Nav, Dropdown, DropdownButton } from 'react-bootstrap';
import Flag from 'react-world-flags'; 
import { useTranslation } from 'react-i18next';
import i18n from "./i18n";

function NavigationBar() {

    const { t } = useTranslation();

    const changeLanguage = (language) => {
      i18n.changeLanguage(language, (err, t) => {
        if (err) return console.log("Error loading language:", err);
        // console.log("Language changed to:", language);
      });
    };
  return (
    <Navbar bg="light" variant="light" expand="lg">
        <Nav className="mr-auto">
 
          <DropdownButton
            id="flag-dropdown"
            title={<Flag code="us" style={{ width: '30px', height: '20px' }} />}
            variant="link"
            align="end"
          >
            <Dropdown.Item eventKey="1" onClick={() => changeLanguage("en")}>
              <Flag code="us" style={{ width: '30px', height: '20px' }} />
            </Dropdown.Item>
            <Dropdown.Item onClick={() => changeLanguage("ar")}>
            <Flag code="SA" style={{ width: '30px', height: '20px' }} /> 
            </Dropdown.Item>
            <Dropdown.Item eventKey="2" onClick={() => changeLanguage("en")}>
              <Flag code="gb" style={{ width: '30px', height: '20px' }} />
            </Dropdown.Item>
            <Dropdown.Item eventKey="3">
              <Flag code="fr" style={{ width: '30px', height: '20px' }} />
            </Dropdown.Item>
            <Dropdown.Item eventKey="4">
              <Flag code="de" style={{ width: '30px', height: '20px' }} />
            </Dropdown.Item>
          </DropdownButton>
        </Nav>
    </Navbar>
  );
}

export default NavigationBar;
