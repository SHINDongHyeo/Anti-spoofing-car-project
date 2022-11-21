package encore.security.test.service.account;

import encore.security.test.entity.Account;
import encore.security.test.entity.Authority;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Set;

public class CustomUserDetails implements UserDetails {

    private static final long serialVersionUID = 1L;
    private Account account;
    public CustomUserDetails(Account account){
        this.account = account;
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Set<Authority> authorities = account.getAuthorities();
        List<SimpleGrantedAuthority> simpleGrantedAuthorities = new ArrayList<>();

        for(Authority authoritiy : authorities){
            simpleGrantedAuthorities.add(new SimpleGrantedAuthority(authoritiy.getAuthorityName()));
        }

        return simpleGrantedAuthorities;
    }

    @Override
    public String getPassword() {
        return account.getPassword();
    }

    @Override
    public String getUsername() {
        return account.getUsername();
    }

    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return false;
    }
}
