package encore.security.test.entity;

import lombok.*;

import javax.persistence.*;


@Entity
@Table(name = "authority")
@Builder
public class Authority {


   @Id
   @Column(name = "authority_id")
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private Long authority_id;


   @Column(name = "authority_name", length = 50 , unique=true)
   private String authority_name;


   public Authority(){

   }

   public Authority(Long authority_id , String authority_name){
      this.authority_name = authority_name;
      this.authority_id = authority_id;
   }

   public Authority(String authority_name){
      this.authority_name = authority_name;
   }

   public Authority(Long authority_id){
      this.authority_id = authority_id;
   }


   public Long getAuthority_id() {
      return authority_id;
   }

   public void setAuthority_id(Long authority_id) {
      this.authority_id = authority_id;
   }

   public String getAuthorityName() {
      return authority_name;
   }

   public void setAuthorityName(String authority_name) {
      this.authority_name = authority_name;
   }

   @Override
   public String toString() {
      return this.authority_name;
   }

}
