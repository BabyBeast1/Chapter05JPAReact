package user.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import user.bean.UserDTO;
import user.service.UserService;

@CrossOrigin
@RestController
@RequestMapping(path = "user")
public class UserController {
	@Autowired
	private UserService userService;

	@GetMapping(path = "isExistId")
	public String isExistId(@RequestParam String id) {
		System.out.println("들어와?");
		return userService.isExistId(id);
	}

	@PostMapping(path = "write")
	public void write(@ModelAttribute UserDTO userDTO) {
		userService.write(userDTO);
	}

	//axios.get()을 썻기 때문에 @GetMapping 으로 변경
	@GetMapping(path = "getUserList")
	public Page<UserDTO> getUserList(
			//page는 0부터 시작, 0이면 1페이지, 1이면 2페이지, ....
			@PageableDefault(page=0, size=3, sort="name", direction= Sort.Direction.DESC) Pageable pageable) {
		return userService.getUserList(pageable);
	}

	@GetMapping(path = "getUser")
	public Optional<UserDTO> getUser(@RequestParam String id) {
		return userService.getUser(id);
	}

	@PutMapping(path = "update")
	public void update(@ModelAttribute UserDTO userDTO) {
		userService.update(userDTO);
	}

	 
	@DeleteMapping(path="delete")
	public void delete(@RequestParam String id) {
		userService.delete(id); 
	}
	
	@GetMapping(path="getUserSearchList")
	public Page<UserDTO> getUserSearchList(@RequestParam String columnName,
											@RequestParam String keyword,
											@PageableDefault(page=0, size=3, sort="name", direction = Sort.Direction.DESC) Pageable pageable
											){
		return userService.getUserSearchList(columnName, keyword, pageable);
	}
	 	
}
