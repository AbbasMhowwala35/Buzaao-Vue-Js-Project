<template>
     <div class="sidebar" @mouseenter="isMenuOver=true" @mouseleave="isMenuOver=false"  @touchstart="isMenuOver=true" >
        <div class="main-menu">
            <vue-perfect-scrollbar class="scroll" :settings="{ suppressScrollX: true, wheelPropagation: false }" >
                <ul class="list-unstyled">
                   <li :class="{ active : selectedParentMenu==='dashboards' }"><router-link tag="li" to="/app/dashboards/default"><a><i class="iconsminds-shop-4"></i>{{ $t("menu.dashboards") }}</a></router-link></li>
                   <li :class="{ active : selectedParentMenu==='pages'}"><a @click.prevent="openSubMenu($event,'pages')" href="#pages"><i class="iconsminds-digital-drawing"></i>{{ $t("menu.service") }}</a></li>
                   <!-- <li :class="{ active : selectedParentMenu==='applications'}"><a @click.prevent="openSubMenu($event,'applications')" href="#applications"><i class="iconsminds-air-balloon-1"></i>{{ $t("User") }}</a></li> -->
                   <li :class="{ active : selectedParentMenu==='ui'}"><a @click.prevent="openSubMenu($event,'ui')" href="#ui"><i class="iconsminds-pantone"></i>{{ $t("menu.Order") }}</a></li>
                </ul>
            </vue-perfect-scrollbar>
        </div>
        <div class="sub-menu">          
             <vue-perfect-scrollbar class="scroll" :settings="{ suppressScrollX: true, wheelPropagation: false }" >
                <ul class="list-unstyled" data-link="pages" :class="{'d-block':selectedParentMenu==='pages' }">
                    <router-link tag="li" to="/app/pages/service"><a><i class="simple-icon-credit-card"></i> <span>{{ $t("service.service-list") }}</span></a></router-link>
                    <router-link tag="li" to="/app/pages/service-stage"><a><i class="simple-icon-notebook"></i> <span>{{ $t("service.service-stage") }}</span></a></router-link>
                    <router-link tag="li" to="/app/pages/service-stage-task"><a><i class="simple-icon-docs"></i> <span>{{ $t("service.service-stage-task") }}</span></a></router-link>
                    <router-link tag="li" to="/app/pages/service-milestones"><a><i class="iconsminds-add-file"></i> <span>{{ $t("service.service-milestones") }}</span></a></router-link>
                </ul>
                <ul class="list-unstyled" data-link="ui" :class="{'d-block':selectedParentMenu==='ui' }">
                  <router-link tag="li" to="/app/orders/"><a><i class="iconsminds-letter-open"></i> <span>{{ $t("order.orderlist") }}</span></a></router-link>
                  <router-link tag="li" to="/app/orders/order-stages"><a><i class="simple-icon-control-end"></i> <span>{{ $t("order.order-stages") }}</span></a></router-link>
                  <router-link tag="li" to="/app/orders/order-stages-task"><a><i class="simple-icon-list"></i> <span>{{ $t("order.order-stages-task") }}</span></a></router-link>
                  <router-link tag="li" to="/app/orders/order-milestones"><a><i class="simple-icon-bell"></i> <span>{{ $t("order.order-milestone") }}</span></a></router-link>
                  <router-link tag="li" to="/app/orders/order-articles"><a><i class="iconsminds-newspaper"></i> <span>{{ $t("order.order-articles") }}</span></a></router-link>
                  <router-link tag="li" to="/app/orders/client-management"><a><i class="simple-icon-people"></i> <span>{{ $t("order.client-management") }}</span></a></router-link>
                  <router-link tag="li" to="/app/orders/staff-management"><a><i class="iconsminds-affiliate"></i> <span>{{ $t("user.staff-management") }}</span></a></router-link>
                  <router-link tag="li" to="/app/orders/user-role"><a><i class="iconsminds-student-male"></i> <span>{{ $t("user.user-role") }}</span></a></router-link>
                  <router-link tag="li" to="/app/orders/organization-management"><a><i class="iconsminds-student-male"></i> <span>{{ $t("order.organization-management") }}</span></a></router-link>
                </ul>
                <ul class="list-unstyled" data-link="menu" :class="{'d-block':selectedParentMenu==='menu' }">
                    <router-link tag="li" to="#/app/menu/default" @click.native.prevent="changeDefaultMenuType('menu-default')"><a><i class="simple-icon-control-pause"></i> <span>{{ $t("menu.default") }}</span></a></router-link>
                    <router-link tag="li" to="#/app/menu/subhidden" @click.native.prevent="changeDefaultMenuType('menu-sub-hidden')"><a><i class="simple-icon-arrow-left mi-subhidden"></i> <span>{{ $t("menu.subhidden") }}</span></a></router-link>
                    <router-link tag="li" to="#/app/menu/hidden" @click.native.prevent="changeDefaultMenuType('menu-hidden')"><a><i class="simple-icon-control-start mi-hidden"></i> <span>{{ $t("menu.hidden") }}</span></a></router-link>
                </ul>
            </vue-perfect-scrollbar>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
import { menuHiddenBreakpoint, subHiddenBreakpoint,currentUser } from '@/constants/config'

export default {
  data () {
    return {
      selectedParentMenu: '',
      isMenuOver: false,
      permissionval : {}
    }
  },
  mounted () {
    this.selectMenu()
    //console.log(permission)
    this.permissionval = currentUser.userpermission
    window.addEventListener('resize', this.handleWindowResize)
    document.addEventListener('click', this.returnSelectedMenu)
    this.handleWindowResize()
  },
  beforeDestroy () {
    document.removeEventListener('click', this.returnSelectedMenu)
    window.removeEventListener('resize', this.handleWindowResize)
  },

  methods: {
    ...mapMutations(['changeSideMenuStatus', 'addMenuClassname', 'changeSelectedMenuHasSubItems']),
    selectMenu () {
      const currentParentUrl = this.$route.path.split('/').filter(x => x !== '')[1]
      if (currentParentUrl !== undefined || currentParentUrl !== null) {
        this.selectedParentMenu = currentParentUrl.toLowerCase()
      } else {
        this.selectedParentMenu = 'dashboards'
      }
    },
    changeSelectedParentHasNoSubmenu (parentMenu) {
      this.selectedParentMenu = parentMenu
      this.changeSelectedMenuHasSubItems(false)
      this.changeSideMenuStatus({ step: 0, classNames: this.menuType })
    },
    openSubMenu (e, selectedParent) {
      this.changeSelectedMenuHasSubItems(true)

      const currentClasses = this.menuType ? this.menuType.split(' ').filter(x => x !== '') : ''

      if (!currentClasses.includes('menu-mobile')) {
        if (
          currentClasses.includes('menu-sub-hidden') &&
          (this.menuClickCount === 2 || this.menuClickCount === 0)
        ) {
          this.changeSideMenuStatus({ step: 3, classNames: this.menuType })
        } else if (
          currentClasses.includes('menu-hidden') &&
          (this.menuClickCount === 1 || this.menuClickCount === 3)
        ) {
          this.changeSideMenuStatus({ step: 2, classNames: this.menuType })
        } else if (
          currentClasses.includes('menu-default') &&
          !currentClasses.includes('menu-sub-hidden') &&
          (this.menuClickCount === 1 || this.menuClickCount === 3)
        ) {
          this.changeSideMenuStatus({ step: 0, classNames: this.menuType })
        }
      } else {
        this.addMenuClassname({ classname: 'sub-show-temporary', currentClasses: this.menuType })
      }
      this.selectedParentMenu = selectedParent
    },
    addEvents () {
      document.addEventListener('click', this.handleDocumentClick)
    },
    removeEvents () {
      document.removeEventListener('click', this.handleDocumentClick)
    },
    returnSelectedMenu () {
      if (!this.isMenuOver) {
        this.selectMenu()
      }
    },
    handleDocumentClick (e) {
      if (!this.isMenuOver) {
        let cont = true
        e.path.map(p => {
          if (p.nodeName !== 'svg' && p.className !== undefined && p.className.indexOf('menu-button') > -1) {
            cont = false
          }
        })
        if (cont) {
          this.toggle()
        }
      }
    },
    toggle () {
      const currentClasses = this.menuType.split(' ').filter(x => x !== '')
      if (currentClasses.includes('menu-sub-hidden') && this.menuClickCount === 3) {
        this.changeSideMenuStatus({ step: 2, classNames: this.menuType })
      } else if (currentClasses.includes('menu-hidden') || currentClasses.includes('menu-mobile')) {
        this.changeSideMenuStatus({ step: 0, classNames: this.menuType })
      }
    },
    // Resize
    handleWindowResize (event) {
      if (event && !event.isTrusted) {
        return
      }
      let nextClasses = this.getMenuClassesForResize(this.menuType)
      this.changeSideMenuStatus({ step: 0, classNames: nextClasses.join(' ') })
    },
    getMenuClassesForResize (classes) {
      let nextClasses = classes.split(' ').filter(x => x !== '')
      const windowWidth = window.innerWidth

      if (windowWidth < menuHiddenBreakpoint) {
        nextClasses.push('menu-mobile')
      } else if (windowWidth < subHiddenBreakpoint) {
        nextClasses = nextClasses.filter(x => x !== 'menu-mobile')
        if (
          nextClasses.includes('menu-default') &&
          !nextClasses.includes('menu-sub-hidden')
        ) {
          nextClasses.push('menu-sub-hidden')
        }
      } else {
        nextClasses = nextClasses.filter(x => x !== 'menu-mobile')
        if (
          nextClasses.includes('menu-default') &&
          nextClasses.includes('menu-sub-hidden')
        ) {
          nextClasses = nextClasses.filter(x => x !== 'menu-sub-hidden')
        }
      }
      return nextClasses
    },
    // Change Default Menu Type
    changeDefaultMenuType (containerClassnames) {
      let nextClasses = this.getMenuClassesForResize(containerClassnames)
      this.changeSideMenuStatus({ step: 0, classNames: nextClasses.join(' ') })
    }
  },
  computed: {
    ...mapGetters({
      menuType: 'getMenuType',
      menuClickCount: 'getMenuClickCount',
      selectedMenuHasSubItems: 'getSelectedMenuHasSubItems'
    })
  },
  watch: {
    menuType: function (val) {
      if (val.indexOf('show-temporary') > -1) {
        this.addEvents()
      } else {
        this.removeEvents()
      }
    },
    '$route' (to, from) {
      if (to.path !== from.path) {
        this.changeSideMenuStatus({ step: 0, classNames: this.menuType })
        this.selectMenu()
        window.scrollTo(0, top)
      }
    }
  }
}
</script>
