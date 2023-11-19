import { doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect } from 'react'
import { postsCol } from '../firebase';

export default function CommentBox({id, comments}) {

  const [MyComment, setMyComment] = useState("");
  const dropdownRef = useRef();
  const [showDropdown, setShowDropdown] = useState(false);

  handleComment = (id) => {
    
  }

  const handleDropdownToggle = (isOpen) => {
    setShowDropdown(isOpen);
  };

  const handleDocumentClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  const handleEmojiSelect = (emoji) => {
    setMyComment(prev => prev + emoji.native)
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleDocumentClick);
    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, []);

  return (
    <Form className="w-100 p-2" onSubmit={handleComment}>
      <Form.Control
        type="textarea"
        placeholder="What's on your mind"
        className="mb-2 fs-3"
        style={{ minHeight: "80px" }}
        value={post}
        onChange={(e) => setMyComment(e.target.value)}
      />
      <div className="d-flex justify-content-end">
        <Button
          variant="primary"
          type="submit"
          className="fs-5 border rounded-pill me-auto"
        >
          Comment
        </Button>
        <Dropdown
          className="d-flex justify-content-end"
          show={showDropdown}
          onToggle={(isOpen) => handleDropdownToggle(isOpen)}
          ref={dropdownRef}
        >
          <Dropdown.Toggle
            variant="outline"
            id="dropdown-basic"
            className="fs-1 p-2"
          >
            <BsEmojiLaughing />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <Picker data={data} onEmojiSelect={handleEmojiSelect} />
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </Form>
  )
}
