package com.store.onedaySeed.service;//package com.store.onedaySeed.service;
//
//import com.store.onedaySeed.entity.LessonImg;
//import com.store.onedaySeed.repository.LessonImgRepository;
//import jakarta.persistence.EntityNotFoundException;
//import jakarta.transaction.Transactional;
//import lombok.RequiredArgsConstructor;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Service;
//import org.springframework.web.multipart.MultipartFile;
//import org.thymeleaf.util.StringUtils;
//
//@Service
//@Transactional
//@RequiredArgsConstructor
//public class LessonImgService {
//
//    @Value("${lessonImgLocation}")
//    private String lessonImgLocation;
//
//    private final LessonImgRepository lessonImgRepository;
//    private final FileService fileService;
//
//    public void saveLessonImg(LessonImg lessonImg, MultipartFile lessonImgFile) throws Exception{
//        String oriImgName = lessonImg.getOriginImgName();
//        String imgName = "";
//        String imgUrl = "";
//
//        if(!StringUtils.isEmpty(oriImgName)){
//            imgName = fileService.uploadFile(lessonImgLocation, oriImgName, lessonImgFile.getBytes());
//        }
//        lessonImg.updateLessonImg(oriImgName, imgName, imgUrl);
//        lessonImgRepository.save(lessonImg);
//    }
//
//    public void updateLessonImg(Long lessonImgId, MultipartFile lessonImgFile) throws Exception{
//        if(!lessonImgFile.isEmpty()){
//            LessonImg savedLessonImg = lessonImgRepository.findById(lessonImgId)
//                    .orElseThrow(EntityNotFoundException::new);
//            if(!StringUtils.isEmpty(savedLessonImg.getImgName())){
//                fileService.deleteFile(lessonImgLocation+"/"+savedLessonImg.getImgName());
//            }
//            String oriImgName = lessonImgFile.getOriginalFilename();
//            String imgName = fileService.uploadFile(lessonImgLocation, oriImgName, lessonImgFile.getBytes());
//            String imgUrl = "/images/lesson/" + imgName; //왜 있는지 모르겠음...
//            savedLessonImg.updateLessonImg(oriImgName, imgName, imgUrl);
//        }
//    }
//}
