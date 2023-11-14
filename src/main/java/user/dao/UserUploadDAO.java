package user.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import user.bean.UserUploadDTO;

@Repository
public interface UserUploadDAO extends JpaRepository<UserUploadDTO, Integer>{

	public List<UserUploadDTO> findAllByOrderBySeqDesc();

}
